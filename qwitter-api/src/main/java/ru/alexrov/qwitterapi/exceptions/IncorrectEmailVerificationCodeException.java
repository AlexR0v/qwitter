package ru.alexrov.qwitterapi.exceptions;

public class IncorrectEmailVerificationCodeException extends RuntimeException {

    public IncorrectEmailVerificationCodeException() {
        super("Incorrect email verification code");
    }
}
