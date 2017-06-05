<template>
  <div class="sidebar-panel">
    <p class="sidebar-panel-header">{{ $t('companyInfo.contact') }}</p>
    <p class="sidebar-panel-text">{{ $t('companyInfo.address.street') }}</p>
    <p class="sidebar-panel-text">{{ $t('companyInfo.address.country') }}</p>
    <p class="sidebar-panel-text last">{{ $t('companyInfo.address.tel') }}</p>
    <p class="sidebar-panel-header">{{ $t('companyInfo.openingHours.title') }}</p>
    <p class="sidebar-panel-text last">{{ $t('companyInfo.openingHours.hours') }}</p>
  </div>
</template>

<style lang="sass" scoped>
  @import "../assets/styles/variables"

  .sidebar-panel
    border-top: 5px solid $green
    border-bottom: 5px solid $green
    padding-top: 10px

  .sidebar-panel-header
    font-size: 1.8em
    font-weight: bold
    line-height: 1.3
    text-align: center

  .sidebar-panel-text
    color: #b9b9b9
    font-size: 1.8em
    line-height: 1
    text-align: center

  .last
    margin-bottom: 50px
</style>
