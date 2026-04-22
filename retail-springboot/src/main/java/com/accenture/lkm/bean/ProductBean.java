package com.accenture.lkm.bean;

public class ProductBean {

	private Integer productId;
	private String productName;
	private double price;
	private Integer stock;




	public ProductBean() {
		super();
		// TODO Auto-generated constructor stub
	}


	public ProductBean(Integer productId, String productName, double price, Integer stock) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.stock = stock;
	}

	public Integer getStock() {
		return stock;
	}
	public void setStock(Integer stock) {
		this.stock = stock;
	}


	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}


	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}

}
