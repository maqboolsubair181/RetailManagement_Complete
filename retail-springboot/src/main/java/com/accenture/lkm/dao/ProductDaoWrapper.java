package com.accenture.lkm.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.accenture.lkm.bean.ProductBean;
import com.accenture.lkm.entity.ProductEntity;

@Repository
public class ProductDaoWrapper {

	
	@Autowired
	ProductDao productDao;
	
	
	public Integer updateProductStock(ProductBean productBean) {
		ProductEntity productEntity = productDao.findById(productBean.getProductId()).orElse(null);
		
		if (productEntity==null) {
			return null;
		}
		
	
		productEntity.setPrice(productBean.getPrice());
		productEntity.setStock(productBean.getStock());
		productDao.save(productEntity);
		return productEntity.getProductId();
		
	}

	
	
	
	
	public ProductBean convertProductEntityToBean(ProductEntity productEntity) {
		ProductBean productBean = new ProductBean(productEntity.getProductId(),productEntity.getProductName(),productEntity.getPrice(),productEntity.getStock());
		return productBean;
	}

}
