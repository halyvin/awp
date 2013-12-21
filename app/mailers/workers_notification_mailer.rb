# -*- encoding : utf-8 -*-
class WorkersNotificationMailer < ActionMailer::Base
  default :from => "awp-application@yandex.ru"

  def notifprep( emla, changes, workers, request )
    @changes = []
    changes.each_key do |ckey|
      @changes << "отредактировали описание" if ckey.to_s == "body"
      @changes << "изменили день" if ckey.to_s == "day"
      @changes << "корретировка времени" if ckey.to_s == "time"
      @changes << "замена клиента" if ckey.to_s == "client_id"
      @changes << "заявку закрыли" if ckey.to_s == "closed"
    end
    @workers = workers
    @request = request
    mail(:to => emla, :subject => "AWP :: Информация о заявке №#{request.id}")
  end

  def smsemail( messg_type, numbers, request )
    case messg_type
    when "new"
      messg = "Вас назначили на работу над заявкой #{request.id}"
    when "removed"
      messg = "Вы больше не работаете над заявкой #{request.id}"
    else
      messg = "Заявка #{request.id} была изменена"
    end

    mail(to: "forward@sms4b.ru",
         subject: messg,
         body: numbers.join("\n"))
  end

end
