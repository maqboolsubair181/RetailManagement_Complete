package com.accenture.lkm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.lkm.bean.ProductBean;
import com.accenture.lkm.dao.ProductDaoWrapper;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductDaoWrapper productDaoWrapper;

	public Integer updateProductStock(ProductBean productBean) {
		return productDaoWrapper.updateProductStock(productBean);
	}
		
}
