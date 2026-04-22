package com.accenture.lkm.service;

import java.util.List;



import com.accenture.lkm.bean.OrderBean;


public interface OrderService {
	
	public List<OrderBean> getOrderDetailsByCustomerId(Integer customerId);
	
	public List<OrderBean> getOrderDetailsByCustomerTypeAndBillingRange(String customerType, double minBillingAmount, double maxBillingAmount);
	
}
