package ru.alexrov.qwitterapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.alexrov.qwitterapi.exceptions.EmailAlreadyTakenException;
import ru.alexrov.qwitterapi.exceptions.EmailFailedException;
import ru.alexrov.qwitterapi.exceptions.IncorrectEmailVerificationCodeException;
import ru.alexrov.qwitterapi.exceptions.UserNotFoundException;
import ru.alexrov.qwitterapi.models.ApplicationUser;
import ru.alexrov.qwitterapi.models.RegisterObject;
import ru.alexrov.qwitterapi.services.UserService;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken() {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already taken");
    }


    @PostMapping("/register")
    public ApplicationUser register(@RequestBody RegisterObject ro) {
        return userService.registration(ro);
    }

    @ExceptionHandler({UserNotFoundException.class})
    public ResponseEntity<String> handleUserNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }

    @PutMapping("/phone")
    public ApplicationUser updatePhone(@RequestBody LinkedHashMap<String, String> body) {
        String phone = body.get("phone");
        String username = body.get("username");
        ApplicationUser user = userService.findByUsername(username);
        user.setPhone(phone);
        return userService.updateUser(user);
    }

    @ExceptionHandler({EmailFailedException.class})
    public ResponseEntity<String> handleEmailFailed() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email failed to send. Try again");
    }

    @PostMapping("/email/code")
    public ResponseEntity<Map<String, String>> sendEmailCode(@RequestBody LinkedHashMap<String, String> body) {
        userService.sendEmailVerificationCode(body.get("username"));
        Map<String, String> response = Collections.singletonMap("message", "Email verification code sent");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @ExceptionHandler({IncorrectEmailVerificationCodeException.class})
    public ResponseEntity<String> handleEmailVerificationCode() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect email verification code");
    }

    @PostMapping("/email/verify")
    public ApplicationUser verifyEmail(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        Integer code = Integer.parseInt(body.get("code"));
        return userService.verifyEmail(username, code);
    }

    @PutMapping("/update/password")
    public ApplicationUser updatePassword(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        return userService.setPassword(username, password);
    }
}
