package com.accenture.lkm.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;          
import javax.persistence.Table;





@Entity
@Table(name="customer")
public class CustomerEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int customerId;
	
	private String customerName;
	private String customerEmail;
	private String customerType;
	
	public CustomerEntity() {}
	
	
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerEmail() {
		return customerEmail;
	}
	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}


	public String getCustomerType() {
		return customerType;
	}


	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}
}
