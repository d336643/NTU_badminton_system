package com.example.badminton.converter;

import java.util.ArrayList;
import java.util.List;

import com.example.badminton.model.EventRegistrationData;
import com.example.badminton.model.entity.Registration;

public class RegistrationConverter {
    public List<EventRegistrationData> registrationsConvertToEventRegistrationData (Iterable<Registration> registrations) {
        List<EventRegistrationData> data = new ArrayList<>();
        for (Registration r : registrations) {
            List<Long> competitors = new ArrayList<>();
            competitors.add(r.getApplier().getId());
            if (r.getPartnerUid() != null) {competitors.add(r.getPartnerUid());}
            data.add(EventRegistrationData.builder()
                                          .eventId(r.getId())
                                          .typeId(r.getEvent().getId())
//                                          .competitors(competitors)
                                          .status(r.getStatus())
                                          .payer(r.getPayerUid())
                                          .account(r.getPayAccount())
                                          .build());
        }
        return data;
    }
}
