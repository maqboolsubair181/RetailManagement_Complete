package com.accenture.lkm.service;

import java.util.List;



import com.accenture.lkm.bean.CustomerBean;


public interface CustomerService {
	
	public List<CustomerBean> getCustomerDetailsByType(String customerType);
	
	public CustomerBean updateCustomerType(CustomerBean customerBean);
	
	
	

}
