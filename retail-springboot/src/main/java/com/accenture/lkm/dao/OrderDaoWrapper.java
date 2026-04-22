package com.accenture.lkm.dao;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.accenture.lkm.bean.OrderBean;
import com.accenture.lkm.entity.CustomerEntity;
import com.accenture.lkm.entity.OrderEntity;




@Repository
public class OrderDaoWrapper {

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private CustomerDao customerDao;

	@Autowired	
	private ProductDao productDao;



	public List<OrderBean> getOrderDetailsByCustomerId(Integer customerId) {  
		return convertEntityToBean(orderDao.findByCustomerId(customerId));

	}


	public List<OrderBean> getOrderDetailsByCustomerTypeAndBillingRange(String customerType, double minBillingAmount, double maxBillingAmount) {
		List<CustomerEntity> customerEntities = customerDao.getCustomerDetailsByType(customerType);
		List<Integer> customerIds = new ArrayList<Integer>();
		for (CustomerEntity customerEntity : customerEntities) {
			customerIds.add(customerEntity.getCustomerId());
		}
		return convertEntityToBean(orderDao.orderDetailsWithinRange(customerIds, minBillingAmount, maxBillingAmount));
	}




	public List<OrderBean> convertEntityToBean(List<OrderEntity> orderEntity) {  // method to convert to bean and also add the customer mail and product name

		List<OrderBean> order = new ArrayList<OrderBean>();
		for (OrderEntity orderEntity2 : orderEntity) {
			OrderBean orderBean = new OrderBean();
			BeanUtils.copyProperties(orderEntity2, orderBean);
		
			customerDao.findById(orderEntity2.getCustomerId()).ifPresent(c -> orderBean.setCustomerEmail(c.getCustomerEmail()));
			productDao.findById(orderEntity2.getProductId()).ifPresent(p -> orderBean.setProductName(p.getProductName()));

			order.add(orderBean);
		}

		return order;

	}


}


