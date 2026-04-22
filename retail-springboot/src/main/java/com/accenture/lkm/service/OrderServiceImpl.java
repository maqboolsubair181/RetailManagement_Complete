package com.accenture.lkm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.lkm.bean.OrderBean;
import com.accenture.lkm.dao.OrderDaoWrapper;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	OrderDaoWrapper orderDaoWrapper;

	public List<OrderBean> getOrderDetailsByCustomerId(Integer customerId){
		return orderDaoWrapper.getOrderDetailsByCustomerId(customerId);
	}
	
	public List<OrderBean> getOrderDetailsByCustomerTypeAndBillingRange(String customerType, double minBillingAmount, double maxBillingAmount){
		return orderDaoWrapper.getOrderDetailsByCustomerTypeAndBillingRange(customerType, minBillingAmount, maxBillingAmount);
	}

	

	
	
}
