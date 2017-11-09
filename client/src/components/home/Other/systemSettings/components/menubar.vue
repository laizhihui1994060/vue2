<template>  
    <ul>  
    	<li v-for='(item, index) in items' class='branch_company_li childrenLi'>
    		<p @click='choose(index)'><i class='icon img'></i>{{item.name}}</p>
    		<template v-if='item.child && item.child.length > 0'>
    			<menubar :items='item.child'></menubar>
    		</template>
    	</li>
    </ul>  
</template> 


<script>
	export default{
		name: "menubar",
		props:{
			items: {

			}
		},
		methods:{
			choose(index){
				console.log(this.items)
				$('.corporate_management .li_active').removeClass('li_active');
				$(event.target).parent().addClass('li_active');
				$(event.target).siblings('ul').slideToggle();

				bus.$emit('chooseCompany', this.items[index]);
			},
		}
	}
</script>

<style scoped>	
	
</style>