package com.accenture.lkm.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import com.accenture.lkm.bean.CustomerBean;
import com.accenture.lkm.entity.CustomerEntity;


@Repository
public class CustomerDaoWrapper {
	
	
	
	@Autowired
	CustomerDao customerDao;
	
	public List<CustomerBean> getCustomerDetailsByType(String customerType) {
		
		return customerDao.getCustomerDetailsByType(customerType)
				.stream()
				.map(this::convertCustomerEntityToBean)
				.collect(Collectors.toList());
		
	}
	
	
	public CustomerBean updateCustomerType (CustomerBean customerBean) {
		CustomerEntity customerEntity = customerDao.findById(customerBean.getCustomerId()).get();
		customerEntity.setCustomerType(customerBean.getCustomerType());
		
		CustomerEntity updatedEntity =customerDao.save(customerEntity);
		return convertCustomerEntityToBean(updatedEntity);
				
	}
	
	
	
	public CustomerBean convertCustomerEntityToBean(CustomerEntity customerEntity) {
		
		CustomerBean customerBean = new CustomerBean();
		customerBean.setCustomerId(customerEntity.getCustomerId());
		customerBean.setCustomerName(customerEntity.getCustomerName());
		customerBean.setCustomerEmail(customerEntity.getCustomerEmail());
		customerBean.setCustomerType(customerEntity.getCustomerType());
		
		return customerBean;
			
	}

}
