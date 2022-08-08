package com.example.badminton.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegistrationDataValidator {

    // digit + lowercase char
    private static final String PASSWORD_PATTERN =
            "^(?=.*\\d)(?=.*[a-zA-Z]).{8,20}$";

    // email: end with @ntu.edu.tw
    private static final String EMAIL_PATTERN =
            "^[A-Za-z0-9._%+-]+@ntu\\.edu\\.tw$";

    private static final Pattern passwordPattern = Pattern.compile(PASSWORD_PATTERN);

    private static final Pattern emailPattern = Pattern.compile(EMAIL_PATTERN);

    public static Boolean isValidPassword(final String password) {
        Matcher matcher = passwordPattern.matcher(password);
        return matcher.matches();
    }

    public static Boolean isValidEmail(final String email) {
        Matcher matcher = emailPattern.matcher(email);
        return matcher.matches();
    }

//    public static Boolean isValidBirthday(final String birthday) {
//
//    }
}
