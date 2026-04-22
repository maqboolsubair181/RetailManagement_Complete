package com.accenture.lkm.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.accenture.lkm.bean.ProductBean;
import com.accenture.lkm.service.ProductService;


@RestController
@RequestMapping("/product/controller")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	

	@PutMapping("/updateProductStock")
	public ResponseEntity<String> updateProductStock(@RequestBody ProductBean productBean){
		
		Integer id= productService.updateProductStock(productBean);
		if(id!=null) {
			return new ResponseEntity<String>("Product stock updated successfully with id:"+id,HttpStatus.OK);
		}
		
		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		
		
	}

}
