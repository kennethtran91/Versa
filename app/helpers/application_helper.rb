module ApplicationHelper

	def notices
		flash[:notice] ||= []
	end

	def alerts
		flash[:alert] ||= []
	end

end
