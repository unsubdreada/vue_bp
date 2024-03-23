<template>
  <div
    class="w-4/5 m-auto text-center mt-10 border border-slate-200 rounded-3xl p-10 cursor-default"
  >
    <h1 class="text-2xl font-bold mb-5">О проекте</h1>
    <p>
      <b>BudgetPlanner</b> - это веб-приложение, предназначенное для помощи пользователям в
      управлении своими финансами.
    </p>
    <p class="border-b border-dashed border-slate-300 w-2/3 m-auto mt-5 pb-5">
      <b>Возможности приложения:</b>
    </p>

    <div class="flex justify-center mt-5">
      <ul class="grid grid-cols-1 gap-4">
        <li class="flex items-center gap-3">
          <img src="/wallet.png" alt="" />
          <i>Учет доходов и расходов</i>
        </li>
        <li class="flex items-center gap-3">
          <img src="/bar-chart.png" alt="" />
          <i>Бюджетирование</i>
        </li>
        <li class="flex items-center gap-3">
          <img src="/flags.png" alt="" />
          <i>Установка финансовых целей</i>
        </li>
        <li class="flex items-center gap-3">
          <img src="/business-analysis.png" alt="" />
          <i>Анализ и отчетность </i>
        </li>
        <li class="flex items-center gap-3">
          <img src="/notification.png" alt="" />
          <i>Уведомления и напоминания</i>
        </li>
      </ul>
    </div>
  </div>
</template>
