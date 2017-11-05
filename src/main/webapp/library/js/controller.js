var entry = angular.module('mainapp',['ui.grid','ui.grid.selection','ui.grid.resizeColumns']);

entry.controller('searchcontrol',function($scope,$http,$rootScope,uiGridConstants,$log){
	
	$scope.gridOptions = {};
	//var query = "SELECT B.ISBN10,B.Title,BA.Fullname,BC.Branch_id,BR.branch_name,BC.No_of_copies,(BC.No_of_copies-output2.output) AS No_of_available_copies FROM BOOKS B LEFT JOIN Book_Authors BA1 on bA1.isbn10=B.isbn10 LEFT JOIN AUTHORS AS BA ON BA.Author_Id = BA1.Author_Id LEFT JOIN BOOK_COPIES AS BC ON BC.Book_id = B.isbn10 JOIN Library_Branch BR on BR.Branch_id=Bc.Branch_Id LEFT JOIN (select Branch_id, isbn, ISnull(count(1),0) as output FROM BOOK_LOANS WHERE Date_in is null group by Branch_id,isbn) AS output2 ON output2.isbn = B.isbn10 AND output2.Branch_id = BC.Branch_id  where  BA.fullname like %27%25%25%27 AND b.title like %27%25%25%27  AND b.isbn10 like %27%25%25%27"
	$http.get("/library/transmittodb.jsp?sqlstr=SELECT top 3000 B.ISBN10,B.Title,BA.Fullname,BC.Branch_id,BR.branch_name,BC.No_of_copies,BC.No_of_copies AS No_of_available_copies FROM BOOKS B LEFT JOIN Book_Authors BA1 on bA1.isbn10=B.isbn10 LEFT JOIN AUTHORS AS BA ON BA.Author_Id = BA1.Author_Id LEFT JOIN BOOK_COPIES AS BC ON BC.Book_id = B.isbn10 JOIN Library_Branch BR on BR.Branch_id=Bc.Branch_Id LEFT JOIN (select Branch_id, isbn, ISnull(count(1),0) as output FROM BOOK_LOANS WHERE Date_in is null group by Branch_id,isbn) AS output2 ON output2.isbn = B.isbn10 AND output2.Branch_id = BC.Branch_id  where  BA.fullname like %27%25%25%27 AND b.title like %27%25%25%27  AND b.isbn10 like %27%25%25%27")
	.success(function(data){
		$scope.datatablesinjson=data;
		$scope.gridOptions.data = $scope.datatablesinjson;
	    console.log(data);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
	}); 
	
	/*$scope.display=function(){
		$scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
	    console.log($scope.mySelectedRows);
	    for(var i=0;i<$scope.mySelectedRows.length;i++){
	    	console.log($scope.mySelectedRows[i].Card_no);
	    }
	};*/
	  
	      
	$scope.submit=function(){
		var name = $scope.isbn;
		console.log('################################333');
		var isbn;
		var author;
		var title;
		if($scope.isbn==null)
			isbn='';
		else
			isbn=$scope.isbn;
		
		if($scope.author==null)
			author='';
		else
			author=$scope.author;
		
		if($scope.title==null)
			title='';
		else
			title=$scope.title;
		
		console.log(isbn+author+title);
		$http.get("/library/transmittodb.jsp?sqlstr=SELECT B.ISBN10,B.Title,BA.Fullname,BC.Branch_id,BR.branch_name,BC.No_of_copies,BC.No_of_copies AS No_of_available_copies FROM BOOKS B LEFT JOIN Book_Authors BA1 on bA1.isbn10=B.isbn10 LEFT JOIN AUTHORS AS BA ON BA.Author_Id = BA1.Author_Id LEFT JOIN BOOK_COPIES AS BC ON BC.Book_id = B.isbn10 LEFT JOIN Library_Branch BR on BR.Branch_id=Bc.Branch_Id LEFT JOIN (select Branch_id, isbn, ISnull(count(1),0) as output FROM BOOK_LOANS WHERE Date_in is null group by Branch_id,isbn) AS output2 ON output2.isbn = B.isbn10 AND output2.Branch_id = BC.Branch_id  where  BA.fullname like %27%25"+author+"%25%27 AND b.title like %27%25"+title+"%25%27  AND b.isbn10 like %27%25"+isbn+"%25%27")
		.success(function(data){
			$scope.datatablesinjson=data;
			$scope.gridOptions.data = $scope.datatablesinjson;
		    //console.log(data);
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn+isbn+title+author);
		}); 
	};
	
	
	$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: true,
		    selectionRowHeaderWidth: 35,
		    rowHeight: 40,
		    showGridFooter:true
	};
	
	$scope.gridOptions.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
  };
	
	 $scope.gridOptions.multiSelect = true;
	
	$scope.gridOptions.columnDefs = [{
        name: 'ISBN',
        field: 'ISBN10'
    }, {
        name: 'Book Title',
        field: 'Title'
    }, {
        name: 'Author Name',
        field: 'Fullname'
    }, {
        name: 'Branch Id',
        field: 'Branch_id'
    }, {
        name: 'Branch Name',
        field: 'branch_name'
    }, {
        name: '#of Copies',
        field: 'No_of_copies'
    }, {
        name: '#of Available Copies',
        field: 'No_of_available_copies'
    }];
});

entry.controller('checkincontrol',function($scope,$http,$rootScope,uiGridConstants,$log){
	
	$scope.gridOptions = {};
	$http.get("/library/transmittodb.jsp?sqlstr=SELECT BL.Isbn,BL.Card_no,ISNULL(BR.Fname,%27%27)%2B %27%20%27 %2B ISNULL(BR.Lname,%27%27) As Fullname,BL.Branch_id,BL.Date_in,BL.Date_out,BL.Due_date FROM Book_loans BL LEFT JOIN Borrowers BR ON BL.Card_no=BR.Card_no")
	.success(function(data){
		$scope.datatablesinjson=data;
		$scope.gridOptions.data = $scope.datatablesinjson;
	    //console.log(data);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
	}); 
	
	$scope.checkin=function(){
		$scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
	    console.log($scope.mySelectedRows);
	    for(var i=0;i<$scope.mySelectedRows.length;i++){
	    	console.log($scope.mySelectedRows[i].Card_no);
	    	var cardno = $scope.mySelectedRows[i].Card_no;
	    	var isbnno = $scope.mySelectedRows[i].Isbn;
	    	var branch = $scope.mySelectedRows[i].Branch_id;
	    	/*var fname = $scope.mySelectedRows[i].Fullname.split(" ")[0];
	    	var lname = $scope.mySelectedRows[i].Fullname.split(" ")[1];*/
	    	$http.get("/library/transmittodb.jsp?sqlstr=update book_loans set date_in=getdate%28%29 where card_no=%27"+$scope.mySelectedRows[i].Card_no+"%27 AND isbn=%27"+$scope.mySelectedRows[i].Isbn+"%27")
			.success(function(data){
				/*$scope.datatablesinjson=data;
				$scope.gridOptions.data = $scope.datatablesinjson;*/
			    //console.log(data);
				$http.get("/library/transmittodb.jsp?sqlstr=Select Loan_Id from Book_loans where card_no=%27"+cardno+"%27 AND isbn=%27"+isbnno+"%27 order by loan_id desc")
				.success(function(data){
					var loanid = data[0].Loan_Id;
					console.log(loanid);
					
					$http.get("/library/transmittodb.jsp?sqlstr=select datediff%28dd,due_date,date_in%29*0.25 AS fine_amt from book_loans L where L.Loan_Id=%27"+loanid+"%27")
					.success(function(data){
						//$scope.loanid = data.loan_id;
						//console.log($scope.loanid);
						var fine = data[0].fine_amt;
						
						$http.get("/library/transmittodb.jsp?sqlstr=Update Fines Set fine_amt="+fine+"where Loan_Id=%27"+loanid+"%27")
						.success(function(data){
							
							$http.get("/library/transmittodb.jsp?sqlstr=Update Book_Copies SET No_of_copies=No_of_copies%2B1 where book_id like %27%25"+isbnno+"%25%27 AND branch_id like %27%25"+branch+"%25%27")
							.success(function(data){
								$scope.showError = false;
								$scope.showSuccess = true;
							    $scope.successMessage = 'Book checked in';									
							});
							
							console.log('^^^^^^^^^^+++++++++++++++++++++++++++++^^^^^^^^^');
						});
						console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
					});
				});
				
				console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
			}); 
	    }
	    $http.get("/library/transmittodb.jsp?sqlstr=SELECT BL.Isbn,BL.Card_no,ISNULL(BR.Fname,%27%27)%2B %27%20%27 %2B ISNULL(BR.Lname,%27%27) As Fullname,BL.Branch_id,BL.Date_in,BL.Date_out,BL.Due_date FROM Book_loans BL LEFT JOIN Borrowers BR ON BL.Card_no=BR.Card_no")
		.success(function(data){
			$scope.datatablesinjson=data;
			$scope.gridOptions.data = $scope.datatablesinjson;
		    //console.log(data);
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
		}); 
	};
	  
	      
	$scope.submit=function(){
		var name = $scope.isbn;
		
		var isbn;
		var cardno;
		var borrower;
		if($scope.isbn==null)
			isbn='';
		else
			isbn=$scope.isbn;
		
		if($scope.cardno==null)
			cardno='';
		else
			cardno=$scope.cardno;
		
		if($scope.borrower==null)
			borrower='';
		else
			borrower=$scope.borrower;
		
		console.log('################################333');
		$http.get("/library/transmittodb.jsp?sqlstr=SELECT BL.Isbn,BL.Card_no,ISNULL(BR.Fname,%27%27)%2B %27%20%27 %2B ISNULL(BR.Lname,%27%27) As Fullname,BL.Branch_id,BL.Date_in,BL.Date_out,BL.Due_date FROM Book_loans BL LEFT JOIN Borrowers BR ON BL.Card_no=BR.Card_no where ISNULL(BR.Fname,%27%27)%2B %27%20%27 %2B ISNULL(BR.Lname,%27%27) like %27%25"+borrower+"%25%27 AND BL.Card_no like %27%25"+cardno+"%25%27 AND BL.Isbn like %27%25"+isbn+"%25%27")
		.success(function(data){
			$scope.datatablesinjson=data;
			$scope.gridOptions.data = $scope.datatablesinjson;
		    //console.log(data);
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
		}); 
	};
	
	
	$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: true,
		    selectionRowHeaderWidth: 35,
		    rowHeight: 40,
		    showGridFooter:true
	};
	
	$scope.gridOptions.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
  };
	
	 $scope.gridOptions.multiSelect = true;
	
	$scope.gridOptions.columnDefs = [{
        name: 'ISBN',
        field: 'Isbn'
    }, {
        name: 'Card#',
        field: 'Card_no'
    }, {
        name: 'Borrower Name',
        field: 'Fullname'
    }, {
        name: 'Branch Id',
        field: 'Branch_id'
    }, {
        name: 'Date In',
        field: 'Date_in'
    }, {
        name: 'Date Out',
        field: 'Date_out'
    }, {
        name: 'Due Date',
        field: 'Due_date'
    }];
	
    
	
});

entry.controller('checkoutcontrol',function($scope,$http,$rootScope,uiGridConstants,$log){
	
	$scope.gridOptions = {};
	
	$http.get("/library/transmittodb.jsp?sqlstr=SELECT * from book_loans")
	.success(function(data){
		$scope.datatablesinjson=data;
		$scope.gridOptions.data = $scope.datatablesinjson;
	    //console.log(data);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
	}); 
	
	$scope.checkout=function(){
		$http.get("/library/transmittodb.jsp?sqlstr=SELECT COUNT%28Loan_id%29 AS MaxBooksTaken from Book_loans where Card_no like %27%25"+$scope.cardno+"%25%27")
		.success(function(data){
			$scope.datatablesinjson=data;
			//$scope.gridOptions.data = $scope.datatablesinjson;
		    //console.log(data);
			var maxbook = $scope.datatablesinjson[0].MaxBooksTaken;
			console.log($scope.datatablesinjson[0].MaxBooksTaken+"==================================");
			if(maxbook <3){
				console.log("asdaousdaosidaoudsaoudosadu");
				$http.get("/library/transmittodb.jsp?sqlstr=select book_id,branch_id,no_of_copies from book_copies where book_id like %27%25"+$scope.isbn+"%25%27 AND Branch_Id like %27%25"+$scope.branch+"%25%27")
				.success(function(data){
					$scope.temptable=data;
						if($scope.temptable[0].no_of_copies > 0){
							console.log("we can do the insert operation now !");
							
							$http.get("/library/transmittodb.jsp?sqlstr=INSERT into Book_loans%28Isbn,Branch_id,Card_no,Date_in%29 values%28%27"+$scope.isbn+"%27,%27"+$scope.branch+"%27,%27"+$scope.cardno+"%27,getdate%28%29%29")
							.success(function(data){
								$http.get("/library/transmittodb.jsp?sqlstr=Update Book_Copies SET No_of_copies=No_of_copies%2D1 where book_id like %27%25"+$scope.isbn+"%25%27 AND branch_id like %27%25"+$scope.branch+"%25%27")
								.success(function(data){
									$scope.showError = false;
									$scope.showSuccess = true;
								    $scope.successMessage = 'Book checked out';									
								});
							});
							
						} else {
							console.log("No available copies that can be issued");
							$scope.showError = true;
							$scope.showSuccess = false;
						    $scope.errorMessage = 'No available copies that can be issued';
						}
					console.log("@@@@@@@@@@@@@@@@@@@"+$scope.temptable[0].book_id+$scope.temptable[0].branch_id+$scope.temptable[0].no_of_copies+$scope.temptable[0].Loan_id);
				});
				
				/*$http.get("/library/transmittodb.jsp?sqlstr=INSERT into Book_loans%28Isbn,Branch_id,Card_no,Date_in%29 values%28%27"+$scope.isbn+"%27,%27"+$scope.branch+"%27,%27"+$scope.cardno+"%27,getdate%28%29%29")
				.success(function(data){
					
				});*/
				
			} else {
				console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
				$scope.showError = true;
				$scope.showSuccess = false;
			    $scope.errorMessage = 'Not allowed to issue more than 3 books';
				
			}
			
			//console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
		});
		
	};
	  
	      
	$scope.submit=function(){
		var name = $scope.isbn;
		
		var isbn;
		var cardno;
		var branch;
		
		if($scope.isbn==null)
			isbn='';
		else
			isbn=$scope.isbn;
		
		if($scope.cardno==null)
			cardno='';
		else
			cardno=$scope.cardno;
		
		if($scope.branch==null)
			branch='';
		else
			branch=$scope.branch;
		
		console.log('################################333');
		$http.get("/library/transmittodb.jsp?sqlstr=SELECT * from book_loans where isbn like %27%25"+isbn+"%25%27 AND Card_no like %27%25"+cardno+"%25%27 AND Branch_id like %27%25"+branch+"%25%27")
		.success(function(data){
			$scope.datatablesinjson=data;
			$scope.gridOptions.data = $scope.datatablesinjson;
		    //console.log(data);
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
		}); 
	};
	
	
	$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: true,
		    selectionRowHeaderWidth: 35,
		    rowHeight: 40,
		    showGridFooter:true
	};
	
	$scope.gridOptions.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
  };
	
	 $scope.gridOptions.multiSelect = true;
	
	$scope.gridOptions.columnDefs = [{
        name: 'Loan ID',
        field: 'Loan_Id'
    }, {
        name: 'ISBN',
        field: 'Isbn'
    }, {
        name: 'Branch ID',
        field: 'Branch_id'
    }, {
        name: 'Card#',
        field: 'Card_no'
    }, {
        name: 'Date Out',
        field: 'Date_out'
    }, {
        name: 'Due Date',
        field: 'Due_date'
    }, {
        name: 'Date In',
        field: 'Date_in'
    }];
	
    
	
});

entry.controller('borroweraddcontrol',function($scope,$http,$rootScope,uiGridConstants,$log){
	
	$scope.gridOptions = {};
	$http.get("/library/transmittodb.jsp?sqlstr=SELECT * from Borrowers")
	.success(function(data){
		$scope.datatablesinjson=data;
		$scope.gridOptions.data = $scope.datatablesinjson;
	    //console.log(data);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
	});
	      
	$scope.adduser=function(){
		
		if($scope.fname != null && $scope.lname != null && $scope.ssn != null && $scope.address != null){
			var name = $scope.isbn;
			console.log('################################333');
			$http.get("/library/transmittodb.jsp?sqlstr=select ssn from borrowers where ssn like %27%25"+$scope.ssn+"%25%27")
			.success(function(data){
				$scope.tempssn=data;
				if($scope.tempssn[0].ssn==null){
					//generate ID
					//$http.get("/library/transmittodb.jsp?sqlstr=select max%28substring%28card_no,3,6%29%29 as id from borrowers")
					$http.get("/library/transmittodb.jsp?sqlstr=select max%28card_no%29 as id from borrowers")
					.success(function(data){
						//$scope.datatablesinjson=data;
						//$scope.gridOptions.data = $scope.datatablesinjson;
					    //console.log(data);
						//$scope.maxid=data.id+1;
						console.log(data[0].id);
						var newid1 = data[0].id.substring(0,2);
						var newid2 = data[0].id.substring(2,data[0].id.length);
						console.log(newid1+"-----------------"+newid2);
						var newid3 = +newid2 + 1;
						var len = 6-newid3.toString().length;
						for(var i=1;i<=len;i++){
							newid3 = "0" + newid3.toString();
						}
						newid3 = "ID" + newid3;
						$scope.id=newid3;
						console.log($scope.id);
						
						console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
						if(data[0].id != null){
							$http.get("/library/transmittodb.jsp?sqlstr=insert into borrowers%28card_no,ssn,fname,lname,address%29 values%28%27"+$scope.id+"%27,%27"+$scope.ssn+"%27,%27"+$scope.fname+"%27,%27"+$scope.lname+"%27,%27"+$scope.address+"%27%29")
							.success(function(data){
								
								$http.get("/library/transmittodb.jsp?sqlstr=" +
										"Update borrowers set email=ISNULL%28email,%27%27%29," +
										"city=ISNULL%28city,%27%27%29,state=ISNULL%28state,%27%27%29," +
										"phone=ISNULL%28phone,%27%27%29 where email is NULL or city is null " +
										"or state is null or phone is null")
								.success(function(data){
									
									$scope.showSuccess = true;
									$scope.showError = false;
								    $scope.successMessage = $scope.fname+' successfully added to system';
									
									$http.get("/library/transmittodb.jsp?sqlstr=SELECT * from Borrowers")
									.success(function(data){
										$scope.datatablesinjson=data;
										$scope.gridOptions.data = $scope.datatablesinjson;
									    //console.log(data);
										console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
									});					
									
								});
								console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
							});
						}
					});
				} else {
					$scope.showError = true;
					$scope.showSuccess = false;
				    $scope.errorMessage = 'Borrower already added to system';
				}
				//$scope.gridOptions.data = $scope.datatablesinjson;
			    //console.log(data);
				console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
			});
		} else {
			$scope.showError = true;
			$scope.showSuccess = false;
		    $scope.errorMessage = 'Please enter all fields';
		}
		 
	};
	
	
	$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: true,
		    selectionRowHeaderWidth: 35,
		    rowHeight: 40,
		    showGridFooter:true
	};
	
	$scope.gridOptions.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
  };
	
	 $scope.gridOptions.multiSelect = true;
	
	$scope.gridOptions.columnDefs = [{
        name: 'Card  No',
        field: 'Card_no'
    }, {
        name: 'SSN',
        field: 'Ssn'
    }, {
        name: 'Fname',
        field: 'Fname'
    }, {
        name: 'Lname',
        field: 'Lname'
    }, {
        name: 'Email',
        field: 'Email'
    }, {
        name: 'Address',
        field: 'Address'
    }, {
        name: 'City',
        field: 'City'
    }, {
        name: 'State',
        field: 'State'
    }, {
        name: 'Phone',
        field: 'Phone'
    }];
	
    
	
});

entry.controller('finescontrol',function($scope,$http,$rootScope,uiGridConstants,$log){
	
	$scope.gridOptions = {};
	$http.get("/library/transmittodb.jsp?sqlstr=select L.Card_no,sum%28F.fine_amt%29 AS Total_Fine,F.paid from fines F inner join Book_loans L on F.Loan_Id=L.Loan_Id group by L.card_no,F.paid")
	.success(function(data){
		$scope.datatablesinjson=data;
		$scope.gridOptions.data = $scope.datatablesinjson;
	    //console.log(data);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
	}); 
	
	$scope.pay=function(){
		$scope.mySelectedRows = $scope.gridApi.selection.getSelectedRows();
	    console.log($scope.mySelectedRows);
	    for(var i=0;i<$scope.mySelectedRows.length;i++){
	    	console.log($scope.mySelectedRows[i].Total_Fine);
	    	if($scope.mySelectedRows[i].Total_Fine == $scope.fines){
	    		$scope.showError = false;
	    		$http.get("/library/transmittodb.jsp?sqlstr=UPDATE  a SET  a.paid=1 FROM fines a INNER JOIN Book_loans b ON a.Loan_Id = b.Loan_Id where Card_no=%27"+$scope.cardno+"%27")
	    		.success(function(data){
	    			$http.get("/library/transmittodb.jsp?sqlstr=select L.Card_no,sum%28F.fine_amt%29 AS Total_Fine,F.paid from fines F inner join Book_loans L on F.Loan_Id=L.Loan_Id group by L.card_no,F.paid")
	    			.success(function(data){
	    				$scope.datatablesinjson=data;
	    				$scope.gridOptions.data = $scope.datatablesinjson;
	    			    //console.log(data);
	    				console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
	    			});
	    			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
	    		}); 
	    	} else {
	    		$scope.showError = true;
			    $scope.errorMessage = 'Please enter equal fines amount';
	    	}
	    	
	    }
	};
	  
	      
	$scope.search=function(){
		console.log('################################333');
		$http.get("/library/transmittodb.jsp?sqlstr=select L.Card_no,sum%28F.fine_amt%29 AS Total_Fine,F.paid from fines F inner join Book_loans L on F.Loan_Id=L.Loan_Id where card_no=%27"+$scope.cardno+"%27 group by L.card_no,F.paid")
		.success(function(data){
			$scope.datatablesinjson=data;
			$scope.gridOptions.data = $scope.datatablesinjson;
		    //console.log(data);
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%5'+$scope.isbn);
		}); 
	};
	
	
	$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: true,
		    selectionRowHeaderWidth: 35,
		    rowHeight: 40,
		    showGridFooter:true
	};
	
	$scope.gridOptions.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
  };
	
	 $scope.gridOptions.multiSelect = true;
	
	$scope.gridOptions.columnDefs = [{
        name: 'Card  No',
        field: 'Card_no'
    }, {
        name: 'Total Fine',
        field: 'Total_Fine'
    }, {
        name: 'Paid',
        field: 'paid'
    }];
	
    
	
});