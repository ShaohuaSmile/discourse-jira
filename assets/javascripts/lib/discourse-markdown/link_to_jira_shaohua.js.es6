import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features.link_to_jira = !!siteSettings.link_to_jira_plugin_enabled;
  opts.link_to_jira_plugin_list = siteSettings.link_to_jira_plugin_list;
});

function link_to_jira(text, list) {
    const link_to_jira_projects = list.split("|");
    var link_to_jira_issues = new Array(0);
    for(var i=0; i < link_to_jira_projects.length; i++){
		//HHHHHJCAT-1234CCCCCC
	    var matchKey = link_to_jira_projects[i] + "-";
	    findIssue(link_to_jira_issues,text,matchKey,0);
	}
    for(var i=0; i < link_to_jira_issues.length; i++){
		text = text.replace(link_to_jira_issues[i], '<a href="' +'https://plf-jira.rnd.ki.sw.ericsson.se/browse/'+ link_to_jira_issues[i] + '">'+ link_to_jira_issues[i] +'</a>');
    }
	return text;
};
function findIssue(issues, str, matchKey, beginIndex){
    var index = str.indexOf(matchKey, beginIndex);
    if(index < 0){
		return issues;
	}
	if(index != 0 && (str.charAt(index-1) == '\/' || str.charAt(index-1) == '>')){
		return findIssue(issues, str, matchKey, index + 1);
	}
	var issue = matchKey;
	var i = index + matchKey.length;
	while(true){
		var c = str.charAt(i++);
		//not a number or empty or undefined
		if(c < '0' || c > '9'){
		   break;
		}
		issue = issue + c;
	}
	if(issue != matchKey){
		issues.push(issue);
	}
	return findIssue(issues, str, matchKey, index + 1);
}

export function setup(helper) {
  helper.addPreProcessor(text => {
    return link_to_jira(text, helper.getOptions().link_to_jira_plugin_list);
  });
}
