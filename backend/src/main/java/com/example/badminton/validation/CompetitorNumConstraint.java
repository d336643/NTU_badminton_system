package com.example.badminton.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CompetitorNumValidator.class)
public @interface CompetitorNumConstraint {

    String message() default "Event Registration Fail: (1) One person can only register for at most 2 events. (2) uid not exist.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}