module AdminHelper

  def nav_link(path, name, icon=nil)
    class_name = current_page?(path) ? 'active' : nil
    content_tag(:li, class: class_name) do
      link_to path do
        concat content_tag(:i, icon, class: 'material-icons') if icon.present?
        concat content_tag(:p, name)
      end
    end
  end

end
