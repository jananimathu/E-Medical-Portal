	<div class="col-md-4">
					<!-- checkout-progress-sidebar -->
<div class="checkout-progress-sidebar ">
	<div class="panel-group">
		<div class="panel panel-default">
			<div class="panel-heading">
		    	<h4 class="unicase-checkout-title">Your Checkout Progress</h4>
		    </div>
		    <div class="panel-body">
				<ul class="nav nav-checkout-progress list-unstyled">
					<li><a href="my-account.php">My Account</a></li>
					<li><a href="bill-ship-addresses.php">Shipping / Billing Address</a></li>
					<li><a href="order-history.php">Order History</a></li>
					<li><a href="pending-orders.php">Payment Pending Order</a></li>
				</ul>		
			</div>
		</div>
	</div>
</div> 

<!-- Feedback -->
<div class="checkout-progress-sidebar ">
	<div class="panel-group">
		<div class="panel panel-default">
			<div class="panel-heading">Feedback & Report</h4>
		    </div>
		    <div class="panel-body">
				<form action="" method="post" >
				<div class="form-group">
					<textarea class="form-control" name="feedback" id="" cols="40" rows="10" required="required"></textarea>
					<div style="float:right; margin:2%">  
						<input type="submit" name="feedbacksubmit" class="btn btn-lg btn-primary" value="Send">
					</div>
				</div>
				</form>	
			</div>
		</div>
	</div>
</div> 
<!-- checkout-progress-sidebar -->				</div>

<?php
	if(isset($_POST['feedbacksubmit'])){

		include('includes/config.php');
		
		$message=$_POST['feedback'];
		mysqli_query($con,"insert into feedback(userId,message) values('".$_SESSION['id']."','$message')");
		echo '<script>alert("Thank you so much for taking the time to send this! we well soon respond you...")</script>';	

	}
?>
