package ru.alexrov.qwitterapi.exceptions;

public class EmailAlreadyTakenException extends RuntimeException {

    public EmailAlreadyTakenException() {
        super("Email already taken");
    }
}
