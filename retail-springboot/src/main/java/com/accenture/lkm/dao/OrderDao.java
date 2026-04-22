package com.accenture.lkm.dao;


import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.accenture.lkm.entity.OrderEntity;






public interface OrderDao extends JpaRepository<OrderEntity, Integer> {

	
	@Query("select o from OrderEntity o where o.customerId = :customerId")
	public List<OrderEntity> findByCustomerId(Integer customerId);
	
	
	
	@Query("select o from OrderEntity o where o.customerId in :customerIds and o.billingAmount between :minimum and :maximum")
	public List<OrderEntity> orderDetailsWithinRange(List<Integer> customerIds, double minimum, double maximum);
	
	
}
