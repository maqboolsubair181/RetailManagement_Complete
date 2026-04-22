package com.accenture.lkm.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.accenture.lkm.bean.CustomerBean;
import com.accenture.lkm.service.CustomerService;

@RestController
@RequestMapping("/customer/controller")
public class CustomerController {


	@Autowired
	private CustomerService customerService;
	
	
	

	@GetMapping("/getCustomersByType/{type}")
	public ResponseEntity<List<CustomerBean>> getCustomerDetailsByType(@PathVariable("type") String type){

		List<CustomerBean> listCustomers= customerService.getCustomerDetailsByType(type);
		if (listCustomers != null && !listCustomers.isEmpty()) {
			return new ResponseEntity<List<CustomerBean>>(listCustomers, HttpStatus.OK);
		}
		
		return new ResponseEntity<List<CustomerBean>>(HttpStatus.NOT_FOUND);
	}
	

	
	@PutMapping("/updateCustomer")
	public ResponseEntity<String> updateCustomerType(@RequestBody CustomerBean customerBean){
		
		CustomerBean customerBeanResult= customerService.updateCustomerType(customerBean);
		
		if(customerBeanResult!=null){
			String response = customerBeanResult.getCustomerEmail()+ " customer type updated to "+customerBeanResult.getCustomerType()+" successfully";
			return new ResponseEntity<>(response,HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
	}
	

}
