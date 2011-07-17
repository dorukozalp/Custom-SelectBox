<?php include_once("header.php");?>
			<header class="box">
				<h1 class="alt"><a href="http://jquery.com/" target="_blank">jQuery</a> Custom SelectBox v0.1 (Fully Css Based)</h1>
			</header>
			<section class="span-24 last">
				<?php include_once("navigation.php");?>
				<section class="span-19 last">
					<article class="span-19 last">
						<article class="box">
							<h3 class="alt">Basic Custom SelectBox Plugin v0.1</h3>
						</article>
						<article class="box">
							<p>I'll write a documentation soon!</p>
							<p>My imagination sucks, modify selectbox colors with css!</p>
						</article>
					</article>
					<article class="span-19 last">
						<!-- Single SelectBox -->
						<article class="span-18 last box">
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
								<span class="span-4 last">
									<a id="getSingleValue" href="#">Value</a>
								</span>
							</section>	
						</article>
						<!-- Single SelectBox -->
							
					<!-- Multiple SelectBox -->
				 	<article class="span-18 last box">
							<section class="span-4">
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
							
							<section style="margin-top:15px;" class="span-4 last">
								<span class="span-5 last">
									<a id="multipleUpdateCustomSelectBox" href="#">Update</a>
								</span>
								<span class="span-5 last">
									<a id="multipleAddCustomSelectBox" href="#">Add</a>
								</span>
								<span class="span-5 last">
									<a id="multipleRemoveCustomSelectBox" href="#">Remove</a>
								</span>
								<span class="span-5 last">
									<a id="getMultipleValue" href="#">Value</a>
								</span>
							</section>
					</article>
				</article>
			</section>
		</section>
<?php include_once("footer.php");?>