package com.AptConnect.vendor_service.service;

import com.AptConnect.vendor_service.model.Vendor;
import com.AptConnect.vendor_service.repository.VendorRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorService {
    @Autowired
    private VendorRepository vendorRepository;

    public VendorService() {
    }

    public List<Vendor> getAllVendors() {
        return this.vendorRepository.findAll();
    }

    public Vendor createVendor(Vendor vendor) {
        return (Vendor)this.vendorRepository.save(vendor);
    }
    public Vendor updateVendor(Vendor vendor, int id) {
        System.out.println("Finding vendor with id: " + id);
        Vendor existingVendor = this.vendorRepository.findById(id).orElseThrow(() -> {
            return new RuntimeException("Vendor not found with id " + id);
        });
        System.out.println("Vendor found: " + existingVendor);
        existingVendor.setVendorName(vendor.getVendorName());
        existingVendor.setVendorEmail(vendor.getVendorEmail());
        existingVendor.setVendorPhone(vendor.getVendorPhone());
        existingVendor.setVendorService(vendor.getVendorService());
        System.out.println("Saving vendor: " + existingVendor);
        return this.vendorRepository.save(existingVendor);
    }



    public void deleteVendor(int id) {
        this.vendorRepository.deleteById(id);
    }
}
