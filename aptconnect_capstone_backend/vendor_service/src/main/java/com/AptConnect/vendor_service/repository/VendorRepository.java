package com.AptConnect.vendor_service.repository;

import com.AptConnect.vendor_service.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {
}
