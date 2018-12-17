<template>
  <div class="box">
    <div class="tag-wrapper" >
      <BtScroll class="tag-scroll"
                ref="userList"
                @scroll="scroll"
                @refresh="refresh"
                :probe-type="probeType"
                :listenScroll="listenScroll"
                :pullingUp="pullingUp"
                :beforeScroll="beforeScroll"
                @beforeScroll="listScroll">
        <ul class="inner-box">
          <li :key="item.id" v-for="(item, index) in dataList" @click="handleClickSelect(item, index)">
            <div class="item-box">
              <div class="department">
                <span class="vertical-line"></span>
                <p class="text">本部门</p>
              </div>
              <div class="item-right">
                <span class="svg-box"><svg-icon icon-class="star"/></span>
                <p class="inner-right">
                  <span class="inner-text">{{item.position}}{{item.name}}</span>
                  <span class="svg-box">
                      <svg-icon icon-class="right"/>
                    </span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </BtScroll>
    </div>
  </div>
</template>

<script>
import InitWorkflowMixin from '../../mixin'
export default {
  name: 'Hist',
  mixins: [InitWorkflowMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../scss/index";
</style>
