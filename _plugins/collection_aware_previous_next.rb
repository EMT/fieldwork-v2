module Jekyll
  class CollectionAwarePreviousNextGenerator < Generator
 
    safe true
    priority :high
 
    def generate(site)
      site.collections.each_pair do |collection_name, posts|

        post_docs = posts.docs.sort_by { |a| a.data["order"] || 0 }

        post_docs.each do |post|
          position = post_docs.index post

          if position && position < post_docs.length - 1
            collection_next = post_docs[position + 1]
          else
            collection_next = nil
          end

          if position && position > 0
            collection_previous = post_docs[position - 1]
          else
            collection_previous = nil
          end

          post.data["#{collection_name}_next"] = collection_next unless collection_next.nil?
          post.data["#{collection_name}_previous"] = collection_previous unless collection_previous.nil?
        end
      end
    end
  end
end