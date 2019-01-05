require "rest-client"
require "ox"

# file_name = "mangas_10.xml"
# xml = Ox.load(File.read(file_name), mode: :hash)
response = RestClient.get("https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=manga&nlist=all")
xml = Ox.load(response.body, mode: :hash)
manga_list = xml[:report][:item] 
# manga_list is an array of json with info
# [
#   {
#   :id => manga id,
#   :name => name,
#   :vintage => release date is suppose
#   }
# ]
filters = []
manga_list.each_slice(50) do |manga_group|
  filters << manga_group.collect {|i| i[:id]}.join("/")
end

manga_info_url = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title="

response = RestClient.get("#{manga_info_url}#{filters.first}")
manga_xml = Ox.load(response.body, mode: :hash)

