package ru.alexrov.qwitterapi.exceptions;

public class EmailFailedException extends RuntimeException {

    public EmailFailedException() {
        super("Failed to send email");
    }
}
