package com.example.badminton.exception;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.example.badminton.model.response.MessageResponse;

@ControllerAdvice
public class MyCustomExceptionsHandler {

    @ExceptionHandler(value = { UserNotFoundException.class })
    public ResponseEntity<Object> handleUserNotFoundExceptionExceptions(UserNotFoundException ex) {
        System.out.println("----------handleUserNotFoundExceptionExceptions--------------");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(false, ex.getMessage()));

    }

    @ExceptionHandler({ AuthenticationException.class })
    public ResponseEntity<Object> handleAuthenticationException(
            AuthenticationException ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse(false, "Unauthorized."));
    }

    @ExceptionHandler({ AccessDeniedException.class })
    public ResponseEntity<Object> handleAccessDeniedException(
            AccessDeniedException ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse(false, "Forbidden"));
    }

    @ExceptionHandler({ MethodArgumentNotValidException.class })
    public ResponseEntity<Object> handleArgumentInvalidException(
            MethodArgumentNotValidException ex, WebRequest request) {

        List<String> errorMsgs = new ArrayList<>();
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            errorMsgs.add(String.format("%s %s", fieldError.getField(), fieldError.getDefaultMessage()));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new MessageResponse(false, String.join(", ", errorMsgs)));
    }

//    @ExceptionHandler(value = { ConstraintViolationException.class })
//    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex) {
//        System.out.println("----------ConstraintViolationException--------------");
//        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
//        String errorMessage = "";
//        if (!violations.isEmpty()) {
//            StringBuilder builder = new StringBuilder();
//            violations.forEach(violation -> builder.append(" " + violation.getMessage()));
//            errorMessage = builder.toString();
//        } else {
//            errorMessage = "ConstraintViolationException occured.";
//        }
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(false, errorMessage));
//    }

    @ExceptionHandler(value = { Exception.class })
    public ResponseEntity<Object> handleOtherExceptions(Exception ex, WebRequest request) {
//        String requestUri = ((ServletWebRequest)request).getRequest().getRequestURI().toString();
        System.out.println("----------handleOtherExceptions--------------\n" + ex.toString());
        return ResponseEntity.internalServerError().body(new MessageResponse(false, ex.getMessage()));
    }

}
