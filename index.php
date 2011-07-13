<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8" />
<link rel="stylesheet" href="blueprint/screen.css" type="text/css" media="screen" /> 
<link rel="stylesheet" href="blueprint/print.css" type="text/css" media="print" /> 
<!--[if lte IE 8]>
		<link rel="stylesheet" href="blueprint/ie.css" type="text/css" media="screen" />
<![endif]-->
<link rel="stylesheet" type="text/css" href="index.css">
<script type="text/javascript" src="jquery.js"></script>
<title>jQuery Custom SelectBox v0.1 (Fully Css Based)</title>
</head>
<body>
		<section class="container">
			<header class="span-24">
				<h1><abbr>jQuery</abbr> Custom SelectBox v0.1 (Fully Css Based)</h1>
			</header>
			<nav class="span-5">
				Navigation Here Soon!
			</nav>
			<article class="span-19 last">
				<article class="span-19 last">
					<section class="span-4">
						<label for="single-selecbox">Single Selecbox</label>
						<select name="single-selecbox" class="uiSelectBox" id="single-selecbox">
							<?php for ($i=0;$i<=10;$i++):?>
								<?php if($i==0): ?>
									<option value="<?=$i ?>" selected="selected"><?=$i ?></option>
								<?php else:?>
									<option value="<?=$i ?>"><?=$i ?></option>
								<?php endif;?>
							<?php endfor;?>
						</select>
					</section>
					<section class="span-15 last">
						<label for="multiple-selecbox">Multiple Selecbox</label>
						<select name="multiple-selecbox" class="uiSelectBox" id="multiple-selecbox" size="5" multiple="multiple">
							<?php for ($i=0;$i<=15;$i++):?>
								<?php if($i < 5): ?>
									<option value="<?=$i ?>" selected="selected"><?=$i ?></option>
								<?php else:?>
									<option value="<?=$i ?>"><?=$i ?></option>
								<?php endif;?>
							<?php endfor;?>
						</select>	
					</section>
				</article>
				<article class="span-19 last">
					<section style="margin-top:15px;" class="span-4 last">
						<span class="span-4 last">
							<a id="updateCustomSelectBox" href="#">Update</a>
						</span>
						<span class="span-4 last">
							<a id="addCustomSelectBox" href="#">Add</a>
						</span>
						<span class="span-4 last">
							<a id="removeCustomSelectBox" href="#">Remove</a>
						</span>
					</section>		
					<section style="margin-top:15px;" class="prepend-5 span-4 last">
						<span class="span-4 last">
							<a id="multipleUpdateCustomSelectBox" href="#">Update</a>
						</span>
						<span class="span-4 last">
							<a id="multipleAddCustomSelectBox" href="#">Add</a>
						</span>
						<span class="span-4 last">
							<a id="multipleRemoveCustomSelectBox" href="#">Remove</a>
						</span>
					</section>
				</article>
			</article>
			<footer class="span-24">
				Copyleft <?=date("Y")?>
			</footer>
		</section>
<script type="text/javascript" src="customSelectBox.js"></script>
<script type="text/javascript" src="index.js"></script>
</body>
</html> 