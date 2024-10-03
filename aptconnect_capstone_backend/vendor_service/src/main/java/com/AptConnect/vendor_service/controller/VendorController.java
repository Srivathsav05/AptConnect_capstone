package com.AptConnect.vendor_service.controller;


import com.AptConnect.vendor_service.model.Vendor;
import com.AptConnect.vendor_service.service.VendorService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vendors")
@CrossOrigin(origins = "http://localhost:4200/")
public class VendorController {
    @Autowired
    private VendorService vendorService;

    public VendorController() {
    }

    @GetMapping({"/getAllVendors"})
    public List<Vendor> getAllVendors() {

        return this.vendorService.getAllVendors();
    }

    @PostMapping({"/createVendor"})
    public Vendor createVendor(@RequestBody Vendor vendor) {
        return this.vendorService.createVendor(vendor);
    }

    @PutMapping("/updateVendor/{id}")
    public Vendor updateVendor(@RequestBody Vendor vendor, @PathVariable int id) {
        System.out.println("Updating vendor with id: " + id);
        return vendorService.updateVendor(vendor, id);
    }


    @DeleteMapping("/deleteVendor/{id}")
    public void deleteVendor(@PathVariable int id) {
        this.vendorService.deleteVendor(id);
    }

}

