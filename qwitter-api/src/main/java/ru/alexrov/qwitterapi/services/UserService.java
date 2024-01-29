package ru.alexrov.qwitterapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.alexrov.qwitterapi.exceptions.EmailAlreadyTakenException;
import ru.alexrov.qwitterapi.exceptions.EmailFailedException;
import ru.alexrov.qwitterapi.exceptions.IncorrectEmailVerificationCodeException;
import ru.alexrov.qwitterapi.exceptions.UserNotFoundException;
import ru.alexrov.qwitterapi.models.ApplicationUser;
import ru.alexrov.qwitterapi.models.RegisterObject;
import ru.alexrov.qwitterapi.models.Role;
import ru.alexrov.qwitterapi.repositories.RoleRepository;
import ru.alexrov.qwitterapi.repositories.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            MailService mailService,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    public ApplicationUser registration(RegisterObject ro) {

        ApplicationUser user = new ApplicationUser();
        user.setFirstName(ro.getFirstName());
        user.setLastName(ro.getLastName());
        user.setEmail(ro.getEmail());
        user.setDateOfBirth(ro.getDateOfBirth());

        boolean nameTaken = true;
        String tempName = "";
        while (nameTaken) {
            tempName = generateUserName(ro.getFirstName(), ro.getLastName());
            if (userRepository.findByUsername(tempName).isEmpty()) {
                nameTaken = false;
            }
        }
        user.setUsername(tempName);

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findRoleByAuthority("USER").get());
        user.setAuthorities(roles);

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    private String generateUserName(String firstName, String lastName) {
        long generatedNumber = (long) Math.floor(Math.random() * 1_000_000_000);
        return firstName + lastName + generatedNumber;
    }

    public ApplicationUser findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);
    }

    public ApplicationUser updateUser(ApplicationUser user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public void sendEmailVerificationCode(String username) {
        ApplicationUser user = this.findByUsername(username);
        user.setVerificationCode(generateVerificationCode());
        try {
            mailService.sendEmail(user.getEmail(), "Email verification code", "Verification code: " + user.getVerificationCode());
            userRepository.save(user);
        } catch (Exception e) {
            throw new EmailFailedException();
        }
    }

    private int generateVerificationCode() {
        return (int) Math.floor(Math.random() * 10000);
    }

    public ApplicationUser verifyEmail(String username, Integer code) {
        ApplicationUser user = this.findByUsername(username);
        if (code.equals(user.getVerificationCode())) {
            user.setEnabled(true);
            user.setVerificationCode(null);
            return userRepository.save(user);
        } else {
            throw new IncorrectEmailVerificationCodeException();
        }
    }

    public ApplicationUser setPassword(String username, String password) {
        ApplicationUser user = this.findByUsername(username);
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
}
