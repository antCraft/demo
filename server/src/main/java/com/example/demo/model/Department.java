package com.example.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name ="department")
@Data
@NoArgsConstructor
public class Department implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5012375981887384993L;
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long dpId;
	private String dpName;
	
	@OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@NonNull
	private List<Employee> empDpId = new ArrayList();

}
