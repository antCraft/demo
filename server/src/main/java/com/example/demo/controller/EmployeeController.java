package com.example.demo.controller;

import static org.hamcrest.CoreMatchers.nullValue;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.model.Department;
import com.example.demo.model.Employee;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

	@Autowired
	private EmployeeRepository empRepository;
	
	@Autowired
	private DepartmentRepository depRepository;
	
	
	
	
	 // -------------------Retrieve All Departments---------------------------------------------
	
	
	@RequestMapping(value = "/departments/", method = RequestMethod.GET)
	public ResponseEntity<List<Department>> listAllDepartments() {
        List<Department> departments = depRepository.findAll();
        if (departments.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
            // You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Department>>(departments, HttpStatus.OK);
    }
	
	// -------------------Retrieve All Employees------------------------------------------
	
	 @RequestMapping(value = "/employees/", method = RequestMethod.GET)
	    public ResponseEntity<List<Employee>> listAllEmployees() {
	        List<Employee> employees = empRepository.findAll();
	        if (employees.isEmpty()) {
	            return new ResponseEntity(HttpStatus.NO_CONTENT);
	            // You many decide to return HttpStatus.NOT_FOUND
	        }
	        return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	    }
	
	 
	// -------------------Retrieve Single Employee------------------------------------------
	 
	 @RequestMapping(value = "/employee/{id}", method = RequestMethod.GET)
	    public ResponseEntity<?> getEmployee(@PathVariable("id") long id) {
	        Optional<Employee> employee = empRepository.findById(id);
	        if (!employee.isPresent()) {
	            return new ResponseEntity(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<Employee>(employee.get(), HttpStatus.OK);
	    }
	 
	// -------------------Create a Employee-------------------------------------------
	 
	 @RequestMapping(value = "/employee/", method = RequestMethod.POST)
	    public ResponseEntity<?> createEmployee(@RequestBody Employee employee, UriComponentsBuilder ucBuilder) {
		 	
		 	Department department = depRepository.findByDpName(employee.getEmpDepartment());
		 	if(department!=null) {
			employee.setDepartment(department);
			
	        empRepository.save(employee);
	 
	        HttpHeaders headers = new HttpHeaders();
	        headers.setLocation(ucBuilder.path("/api/employee/{id}").buildAndExpand(employee.getEmpId()).toUri());
	        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
		 	}
		 	else {
		 		
		 		return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
			}
	    }
	 
	// ------------------- Update a Employee ------------------------------------------------
	 
	 
	 @RequestMapping(value = "/employee/{id}", method = RequestMethod.PUT)
	    public ResponseEntity<?> updateEmployee( @RequestBody Employee employee) { 
	        Employee currentEmployee = empRepository.findById(employee.getEmpId()).get();
	        if (currentEmployee == null) {
	            return new ResponseEntity(HttpStatus.NOT_FOUND);
	        }
	        Department department = depRepository.findByDpName(employee.getEmpDepartment());
	        if(department!=null) {
	        currentEmployee.setEmpName(employee.getEmpName());
	        currentEmployee.setEmpActive(employee.isEmpActive());
	        currentEmployee.setDepartment(department);
	        
	        empRepository.save(currentEmployee);
	        return new ResponseEntity<Employee>(currentEmployee, HttpStatus.OK);
	        }
	        else {
	        	
	        	return new ResponseEntity<Employee>(currentEmployee, HttpStatus.NOT_FOUND);
	        }
	    }
	 

	    // ------------------- Delete a Employee-----------------------------------------
	 
	 @RequestMapping(value = "/employees/{id}", method = RequestMethod.DELETE)
	    public ResponseEntity<?> deleteEmployee(@PathVariable("id") long id) {
	        Employee employee = empRepository.findById(id).get();
	        if (employee == null) {
	            return new ResponseEntity(HttpStatus.NOT_FOUND);
	        }
	        empRepository.deleteById(id);
	        return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
	    }
	
}
