<script setup>
import Fieldset from 'primevue/fieldset'
</script>

<template>
  <div
    class="w-4/5 m-auto text-center mt-10 border border-slate-200 rounded-3xl p-10 cursor-default"
  >
    <h1 class="text-2xl font-bold mb-5">Что может Budget Planner?</h1>

    <div class="w-3/5 m-auto">
      <Fieldset
        legend="Учет доходов и расходов"
        :toggleable="true"
        :collapsed="true"
        :pt="{
          root: { class: 'border border-slate-200 rounded text-left p-3' },
          legend: { class: 'select-none' },
          toggler: {
            class:
              'px-1 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded transition ease-in-out'
          },
          togglerIcon: { class: 'mx-2' },
          legendTitle: { class: 'p-1 align-center' },
          content: { class: 'p-1' }
        }"
      >
        <p class="m-0">
          Возможность вести детальный учет своих финансов, отслеживая все поступления и расходы.
          Пользователь может записывать все доходы, включая зарплату, инвестиционные поступления и
          другие источники, а также отмечать все расходы, включая покупки, счета, арендные платежи и
          прочее. Учет доходов и расходов позволяет лучше понимать, куда уходят деньги, и принимать
          более осознанные финансовые решения.
        </p>
      </Fieldset>

      <Fieldset
        legend="Бюджетирование"
        :toggleable="true"
        :collapsed="true"
        :pt="{
          root: { class: 'border border-slate-200 rounded text-left p-3' },
          legend: { class: 'select-none' },
          toggler: {
            class:
              'px-1 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded transition ease-in-out'
          },
          togglerIcon: { class: 'mx-2' },
          legendTitle: { class: 'p-1 align-center' },
          content: { class: 'p-1' }
        }"
      >
        <p class="m-0">
          Возможность пользователю вести детальный учет своих финансов, отслеживая все поступления и
          расходы. Пользователь может записывать все доходы, включая зарплату, инвестиционные
          поступления и другие источники, а также отмечать все расходы, включая покупки, счета,
          арендные платежи и прочее. Учет доходов и расходов позволяет лучше понимать, куда уходят
          деньги, и принимать более осознанные финансовые решения.
        </p>
      </Fieldset>

      <Fieldset
        legend="Установка финансовых целей"
        :toggleable="true"
        :collapsed="true"
        :pt="{
          root: { class: 'border border-slate-200 rounded text-left p-3' },
          legend: { class: 'select-none' },
          toggler: {
            class:
              'px-1 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded transition ease-in-out'
          },
          togglerIcon: { class: 'mx-2' },
          legendTitle: { class: 'p-1 align-center' },
          content: { class: 'p-1' }
        }"
      >
        <p class="m-0">
          Возможность определять конкретные финансовые цели и создавать планы для их достижения.
          Пользователь может установить цели на накопление определенной суммы денег, оплату долгов,
          покупку крупных товаров или любые другие финансовые аспекты. Установка финансовых целей
          помогает мотивировать и направлять пользователей к достижению желаемых результатов.
        </p>
      </Fieldset>

      <Fieldset
        legend="Анализ и отчетность"
        :toggleable="true"
        :collapsed="true"
        :pt="{
          root: { class: 'border border-slate-200 rounded text-left p-3' },
          legend: { class: 'select-none' },
          toggler: {
            class:
              'px-1 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded transition ease-in-out'
          },
          togglerIcon: { class: 'mx-2' },
          legendTitle: { class: 'p-1 align-center' },
          content: { class: 'p-1' }
        }"
      >
        <p class="m-0">
          Возможность анализировать свои финансовые данные и создавать отчеты для лучшего понимания
          текущего состояния своих финансов. Пользователь может просматривать статистику доходов и
          расходов, анализировать тренды, оценивать эффективность своих инвестиций и многое другое.
          Анализ и отчетность помогают пользователям принимать информированные решения для улучшения
          своего финансового положения.
        </p>
      </Fieldset>

      <Fieldset
        legend="Уведомления и напоминания"
        :toggleable="true"
        :collapsed="true"
        :pt="{
          root: { class: 'border border-slate-200 rounded text-left p-3' },
          legend: { class: 'select-none' },
          toggler: {
            class:
              'px-1 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded transition ease-in-out'
          },
          togglerIcon: { class: 'mx-2' },
          legendTitle: { class: 'p-1 align-center' },
          content: { class: 'p-1' }
        }"
      >
        <p class="m-0">
          Пользователь может настроить уведомления о предстоящих счетах, платежах, важных датах и
          других событиях, чтобы не пропустить важные моменты и своевременно принимать необходимые
          действия. Уведомления и напоминания помогают поддерживать дисциплину и организованность в
          финансовом планировании.
        </p>
      </Fieldset>
    </div>
  </div>
</template>
