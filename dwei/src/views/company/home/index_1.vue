<template>
   <div class="datapanel">
      <TableList/>
      <div class="right">
        <TableList2/>
        <TableList3/>
      </div>
   </div>
</template>
<script setup lang='ts'>
    import TableList from '@/views/company/home/component/TableList'
    import TableList2 from '@/views/company/home/component/TableList2'
    import TableList3 from '@/views/company/home/component/TableList3'
</script>

<style lang='scss' scoped>
.datapanel {
  width: 100%;
  height: calc(100vh - 90px);
  box-sizing:border-box;
  display: flex;
   
    
    .right{
        flex: 1;
        display: flex;
        flex-direction: column; 
    }
  
}
</style>
