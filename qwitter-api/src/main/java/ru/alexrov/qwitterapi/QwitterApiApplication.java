package ru.alexrov.qwitterapi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ru.alexrov.qwitterapi.models.Role;
import ru.alexrov.qwitterapi.repositories.RoleRepository;

@SpringBootApplication
public class QwitterApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(QwitterApiApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository) {
        return args -> roleRepository.save(new Role(1, "USER"));
    }

}
