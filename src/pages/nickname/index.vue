<template>
  <div :class="$style.container">
    <div>
      <el-form :class="$style.form" label-width="100px">
        <el-form-item label="花名字数">
          <el-radio v-model="nicknameLength" :label="2" @change="clear">两个字</el-radio>
          <el-radio v-model="nicknameLength" :label="3" @change="clear">三个字</el-radio>
        </el-form-item>
        <el-form-item :label="`固定第${index}个字`" v-for="index in nicknameLength" :key="index">
          <el-input type="text" v-model="consistentChars[index - 1]" maxlength="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generateNicknames">生成花名</el-button>
        </el-form-item>
      </el-form>
      <div v-for="(nickname, index) in nicknames" :key="index" :class="$style.list">
        <span>{{index + 1}}.</span>
        <span>{{ nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { chineseChars } from '@/const'
export default {
  data () {
    return {
      nicknameLength: 2,
      nicknames: [],
      showCountOnce: 10,
      consistentChars: []
    }
  },
  methods: {
    clear () {
      this.consistentChars = []
      this.nicknames = []
    },
    generateNicknames () {
      let result = []
      let count = this.showCountOnce
      while (count > 0) {
        let nickname = this.generateNickname()
        if (result.indexOf(count) === -1) {
          result.push(nickname)
          count--
        }
      }
      this.nicknames = result
    },
    generateNickname () {
      const count = chineseChars.length
      const indexes = []
      for (let i = 0; i < this.nicknameLength; i++) {
        const randomIndex = Math.floor(count * Math.random())
        indexes.push(randomIndex)
      }
      return indexes.map((item, index) => this.consistentChars[index] || chineseChars[item]).join('')
    }
  }
}
</script>

<style lang="stylus" module>
.container
  display flex
  justify-content center
  align-items center
.form
  max-width 600px
  min-width 400px
.list
  display flex
  span:first-child
    width 25px
  span:last-child
    letter-spacing 3px
</style>
