$(function() {
    $('a[href="#"]').on("click", function() {
        return false
    });
	// AJAX загрузка каталога или новостей //
		$(".bp__submit.ajax").click(function() {

			var thisform=$(this).parents('#getmore'),
                moreButton = $(this),
                ulContainerClass='.blockPage__rowList',
                ulContainerObj = thisform.parents('div').find(ulContainerClass);
                console.log('div = ' + thisform.parents('.blockPage__shell').length);
            thisform.find('.amount').val(ulContainerObj.find('li').length);
			$.ajax({
				type: "post",
				url: window.location.href,
				data: thisform.serialize(),
				dataType: "json",
				success: function(ajaxResponse) {
					if (ajaxResponse.list){
                        addObjFunc(ajaxResponse.list, ulContainerObj);

						if (!ajaxResponse.button) {
							moreButton.fadeOut(100, function(){
                            	$(this).remove();
                        	});
						}
					}
				}
			});
		});
});

var addObjFunc = function(ajResp, ulContainer){
    console.log(ajResp);
    var liClass = 'blockPage__rowItm',
        aLinkClass = 'imgBox',
        captionClass = 'content',
        addcode = '';

    if ((typeof ulContainer != 'undefined')) {
        for (var i = 0; i < ajResp.length; i++) {
            addcode += '<li class="blockPage__rowItm">' +
                            '<a href="' + ajResp[i].slug + '" class="imgBox">' +
                                '<img src="' + ajResp[i].image + '" alt="">' +
                            '</a>' +
                            '<h2 class="listTitle" data-id="ajResp[i].id">' +
                                '<a href="' + ajResp[i].slug + '">' + ajResp[i].title + '</a>' +
                            '</h2>' +
                            '<div class="content" data-id="' + ajResp[i].id + '">' + ajResp[i].content + '</div>' +
                        '</li>';
        }
    };
    ulContainer.append(addcode);
};
