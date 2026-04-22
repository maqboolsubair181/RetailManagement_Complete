package com.accenture.lkm.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.accenture.lkm.bean.OrderBean;
import com.accenture.lkm.service.OrderService;


@RestController
@RequestMapping("/order/controller")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	
	

	
	@GetMapping("/getOrderDetailsByCustomerId/{id}")
	public ResponseEntity<List<OrderBean>> getOrderDetailsByCustomerId(@PathVariable("id") Integer id){
		
		List<OrderBean> listOrders= orderService.getOrderDetailsByCustomerId(id);
		if (listOrders != null && !listOrders.isEmpty()) {
			return new ResponseEntity<List<OrderBean>>(listOrders, HttpStatus.OK);
		}
		
		return new ResponseEntity<List<OrderBean>>(HttpStatus.NOT_FOUND);
		
	}
	

	@GetMapping("/getOrderDetailsByCustomerTypeAndBillingRange/{type}--{min}--{max}")
	public ResponseEntity<List<OrderBean>> getOrderDetailsByCustomerTypeAndBillingRange(@PathVariable("type") String type,@PathVariable("min") double min,@PathVariable("max") double max){
		List<OrderBean> listOrders= orderService.getOrderDetailsByCustomerTypeAndBillingRange(type,min,max);
		if (listOrders != null && !listOrders.isEmpty()) {
			return new ResponseEntity<List<OrderBean>>(listOrders, HttpStatus.OK);
		}
		
		return new ResponseEntity<List<OrderBean>>(HttpStatus.NOT_FOUND);
	}
	
	
	

}
