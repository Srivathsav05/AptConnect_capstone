package com.AptConnect.vendor_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Generated;

@Entity
@Table(name = "vendor")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vendorId;
    private String vendorName;
    private String vendorEmail;
    private String vendorPhone;
    private String vendorService;

    @Generated
    public Vendor() {
    }

    @Generated
    public Vendor(final int vendorId, final String vendorName, final String vendorEmail, final String vendorPhone, final String vendorAddress, final String vendorService) {
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.vendorEmail = vendorEmail;
        this.vendorPhone = vendorPhone;
        this.vendorService = vendorService;
    }

    @Generated
    public int getVendorId() {
        return this.vendorId;
    }

    @Generated
    public String getVendorName() {
        return this.vendorName;
    }

    @Generated
    public String getVendorEmail() {
        return this.vendorEmail;
    }

    @Generated
    public String getVendorPhone() {
        return this.vendorPhone;
    }


    @Generated
    public String getVendorService() {
        return this.vendorService;
    }

    @Generated
    public void setVendorId(final int vendorId) {
        this.vendorId = vendorId;
    }

    @Generated
    public void setVendorName(final String vendorName) {
        this.vendorName = vendorName;
    }

    @Generated
    public void setVendorEmail(final String vendorEmail) {
        this.vendorEmail = vendorEmail;
    }

    @Generated
    public void setVendorPhone(final String vendorPhone) {
        this.vendorPhone = vendorPhone;
    }


    @Generated
    public void setVendorService(final String vendorService) {
        this.vendorService = vendorService;
    }
}
