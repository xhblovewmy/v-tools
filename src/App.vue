<template>
  <el-container>
    <el-header height="44px" class="header">花名生成器</el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
.header {
  display: flex;
  align-items: center;
  background: #46a0fc;
  color: #fff;
}
</style>
