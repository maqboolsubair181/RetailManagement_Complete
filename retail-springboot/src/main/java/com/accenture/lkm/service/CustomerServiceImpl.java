package com.accenture.lkm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.lkm.bean.CustomerBean;
import com.accenture.lkm.dao.CustomerDaoWrapper;

@Service
public class CustomerServiceImpl  implements CustomerService {
	
	@Autowired
	private CustomerDaoWrapper customerDaoWrapper;
	
	public List<CustomerBean> getCustomerDetailsByType(String customerType){
		return customerDaoWrapper.getCustomerDetailsByType(customerType);
	}
	
	public CustomerBean updateCustomerType(CustomerBean customerBean) {
		return customerDaoWrapper.updateCustomerType(customerBean);
	}

}
