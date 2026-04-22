package com.accenture.lkm.bean;

import java.util.Date;

public class OrderBean {
	private Integer orderId;
	private Integer customerId;
	private Integer productId;
	private Date orderDate;
	private Integer quantity;
	private double billingAmount;
	private String customerEmail;
	private String productName;
	
	
	public OrderBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public Date getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(Date date) {
		this.orderDate = date;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public double getBillingAmount() {
		return billingAmount;
	}
	public void setBillingAmount(double billingAmount) {
		this.billingAmount = billingAmount;
	}
	public String getCustomerEmail() {
		return customerEmail;
	}
	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	
		
	
}
