package ru.alexrov.qwitterapi.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RegisterObject {

    private String firstName;
    private String lastName;
    private String email;
    private Date dateOfBirth;
}
