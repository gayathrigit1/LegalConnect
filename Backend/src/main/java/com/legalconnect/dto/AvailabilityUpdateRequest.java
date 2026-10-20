package com.legalconnect.dto;

import com.legalconnect.entity.enums.AvailabilityStatus;
import java.util.List;

public class AvailabilityUpdateRequest {

    private AvailabilityStatus availability;
    private List<LawyerAvailabilitySlotDto> availabilitySlots;

    public AvailabilityUpdateRequest() {
    }

    public AvailabilityStatus getAvailability() {
        return availability;
    }

    public void setAvailability(AvailabilityStatus availability) {
        this.availability = availability;
    }

    public List<LawyerAvailabilitySlotDto> getAvailabilitySlots() {
        return availabilitySlots;
    }

    public void setAvailabilitySlots(List<LawyerAvailabilitySlotDto> availabilitySlots) {
        this.availabilitySlots = availabilitySlots;
    }
}
