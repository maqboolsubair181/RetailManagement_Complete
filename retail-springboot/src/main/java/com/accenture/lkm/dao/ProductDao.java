package com.accenture.lkm.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.accenture.lkm.entity.ProductEntity;

public interface ProductDao extends JpaRepository<ProductEntity, Integer> {

	@Query(value="update ProductEntity p set p.stock=:stock where p.productId=:productId",nativeQuery=true)
	public Integer updateProductStock(Integer productId, Integer stock);
}
