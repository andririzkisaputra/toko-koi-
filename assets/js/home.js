$(document).ready(function() {
    let limit = 6;
    let data = [];
    get();
    function get() {
        $.ajax({
            url: 'config/frontend/list-product.php',
            method: 'POST', 
            dataType: 'json',
            data: {
                limit: limit,
            },
            success: function(res){
                (res.count > limit && limit != 0) ? $('#more button').show() : $('#more button').hide();
                res.data.map(function(val, index){
                    data.push(
                    '<div class="product-item product-app" style="background-image: url(assets/img/product/'+val.name+');">'
                        +'<div class="product-info">'
                            +'<h4>'+val.name_product+'</h4>'
                            +'<p>'+val.description.substring(0, 40)+'...</p>'
                            +'<a href="create-cart.php" class="preview-link"><i class="bx bx-cart"></i></a>'
                            +'<a href="product-details.php?prodact='+val.code_product+'" class="details-link"><i class="bx bx-spreadsheet"></i></a>'
                        +'</div>'
                    +'</div>'
                    )
                })
                data = data.join('');
                data = data.toString();
                $('.product').html(data);
            }
        })
    }

    $('#more button').click(function() {
        limit = 0;
        data = [];
        get();
    });
});