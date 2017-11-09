<template>
	<div id="help">
		<div class='product_features'>
			<h3>产品特性</h3>
			<div>
				<pre>
	1.结合小拖车的业务管理需求。
	  可以管理从接单到结算的全部流程；持结算的完整和准确资料：里程、轨迹、及照片。
	  基于对APP进行管理，WEB界面用于后台管理。
				</pre>
			</div>
			<div>
				<pre>
	2.创造救援业务及需求的生态网。
	  小公司与大公司的共享平台，分享订单，接受平台订单。
	  分享行程计划，供其他公司需求匹配。
	  与平台上其它公司的合作分为伙伴关系，和平台关系；伙伴关系为紧密合作。
				</pre>
			</div>
			<div>
				<pre>
	3. 客户的规模范围
	   支持几台车到十几台车的拖车公司。
	   也初步为企业版扩展奠定基础框架，比如山东大陆这样的多分公司多网点这样的客户。
				</pre>
			</div>
		</div>
		<div class='newbie_guide'>
			<h3>新手指南</h3>
			<nav>
				<div>
					<router-link :to="{ name: 'help', params: { id: 1 }}">
						<img src="../../../assets/single_process.png" height="180" width="180" alt="">
						<br />
						下单流程
					</router-link>
				</div>
				<div>

					<router-link :to="{ name: 'help', params: { id: 2 }}">
						<img src="../../../assets/dispatching_vehicle.png" height="180" width="180" alt="">
						<br />
						下单流程
					</router-link>
				</div>
				<div>

					<router-link :to="{ name: 'help', params: { id: 3 }}">
						<img src="../../../assets/travel_management.png" height="180" width="180" alt="">
						<br />
						下单流程
					</router-link>
				</div>
				<div>

					<router-link :to="{ name: 'help', params: { id: 4 }}">
						<img src="../../../assets/custom_configuration.png" height="180" width="180" alt="">
						<br />
						下单流程
					</router-link>
				</div>
			</nav>
		</div>
	</div>
</template>


<style>
	#help{
		padding:20px 5%;
		color:#333;
		margin:0 auto;
	}
	#help h3{
		margin-bottom:20px;
	}
	#help pre{
		border:0;
		padding:0;
		font-size:14px;
		margin:0;
		background:transparent;
	}
	#help .newbie_guide nav{
		display: flex;
	}
	#help .newbie_guide nav > div{
		flex:1;
	}
	#help .newbie_guide a{
		display: inline-block;
		text-align: center;
	}
</style>